from django.shortcuts import render
from django.shortcuts import render,get_object_or_404
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
from django.urls import is_valid_path
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework import generics,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser 
from .models import *
from .serializers import *
from rest_framework import serializers
from pathlib import Path
import os
from django.db import connection
import base64
from django.core.files.uploadedfile import InMemoryUploadedFile

cursor=connection.cursor()

class register(viewsets.ModelViewSet):
   queryset = stud.objects.all()
   serializer_class = registerserializers
 

class login(APIView):
   def auth(self,username,password):
      try:
         user=list(stud.objects.filter(username=username,password=password,is_active=0).values('username','rollno','year','sec'))[0]
         return user
      except:
         return None
     
   def post(self,request):
      data=request.data 
      serializer = loginserializers(data=data)
      if (serializer.is_valid()):
       user = self.auth(data['username'],data['password'])
       if user is not None:
        stud.objects.filter(username=user).update(is_active=1)
        return  Response(user)
       else :
          raise serializers.ValidationError({"Incorrect Credentials"})
      else :
         return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   def put(self,request):
      data=request.data
      try :
        stud.objects.filter(username=data["user"]).update(is_active=0)
        return Response("Success")
      except :
         raise  serializers.ValidationError("Incorrect Credentials")

class stafflogin(APIView):

   # def auth(self,username,password):
   #    try:
   #       user=list(customuser.objects.filter(username=username,password=password).values_list("username"))
   #       print(user)
   #       return user[0][0]
   #    except:
   #       return None

   def get(self,request):
      return Response(customuser.objects.all().values())
     
   def post(self,request):

      data=request.data
      user = authenticate(request,username=data['username'],password=data['password'])
      
      if user is not None:
         print("user:",user)
         return  Response(str(user))
      else:
         raise  serializers.ValidationError("Incorrect Credentials")
      
    

class qn(viewsets.ModelViewSet):
    queryset=question.objects.all()
    serializer_class=questionserializers
    parser_classes= [MultiPartParser,FormParser]

    def ip(self,image):
      dict={}
      dict["img"]=image
      return dict

    def post(self,request,*args,**kwargs):
      no=0
      tid=request.data["testid"]
      img=dict((request.data).lists())["qns"]    
      ans=list(request.data["ans"].split(","))
      #cursor.execute("CREATE TABLE {} ( username varchar(255) PRIMARY KEY,sec1 int,sec2 int,sec3 int,dept varchar(10));".format(tid))
      for i in img:
        no+=1
        image=self.ip(i)
        question.objects.create(testid=tid,qnno=no,qn=image["img"],ans=ans[no-1])
      return  Response(tid)

class qndisp(generics.ListAPIView):
   queryset = question.objects.all()
   serializer_class = questionserializers
   def get_queryset(self):
        return question.objects.filter(testid=self.kwargs['tid'])


class resdisp(APIView):
    def get(self,request,tid):
      cursor.execute("SELECT * FROM {} WHERE dept='CSE'".format(tid))
      res=cursor.fetchall()
      result=[]
      headers=["username","section1","section2","section3","department"]
      for i in res:
         result+=[{headers[j]:i[j] for j in range(len(i))}]
      return  Response(result)

 
 
class validate(APIView):
   def post(self,request):
      res1=request.data["ans1"]
      res2=request.data["ans2"]
      res3=request.data["ans3"]
      ans=list(question.objects.values_list('ans', flat=True))
      ans1=ans[0:15]
      ans2=ans[15:30]
      ans3=ans[30:45]
      mark1=0
      mark2=0
      mark3=0
      for i in range(len(res1)):
         if(ans1[i]==res1[i]):
            mark1+=1
      for i in range(len(res2)):
         if(ans2[i]==res2[i]):
            mark2+=1
      for i in range(len(res3)):
         if(ans3[i]==res3[i]):
            mark3+=1
      #result.objects.create(username=request.data["username"],sec1=mark1,sec2=mark2,sec3=mark3)
      #cursor.execute("INSERT INTO {} values({},{},{});".format(tid,no,image["img"],ans[no]))
      return Response({"mark1":mark1,"mark2":mark2,"mark3":mark3})
 
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()