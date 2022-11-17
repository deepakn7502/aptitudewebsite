from django.shortcuts import render
from django.shortcuts import render,get_object_or_404
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
from django.urls import is_valid_path
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import serializers
from pathlib import Path
import os

# Create your views here.

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
      user = str(authenticate(request,username=data['username'],password=data['password']))
      if user is not None:
         return  Response(user)
      else:
         raise serializers.ValidationError("Incorrect Credentials")
        
      
    

class qn(viewsets.ModelViewSet):
    queryset=question.objects.all()
    serializer_class=questionserializers
    def ip(self,image):
      dict={}
      dict["img"]=image
      return dict
    

    def post(self,request,*args,**kwargs):
      no=0

      img=dict((request.data).lists())["qns"]    
      ans=list(request.data["ans"].split(","))
      for i in img:
        no+=1
        image=self.ip(i)
        question.objects.create(testid=request.data["testid"],qnno=no,qn=image["img"],ans=ans[no-1])
      return  Response(request.data["testid"])


class qndisp(APIView):
   def get(self,request,tid):
      return  Response(question.objects.filter(testid=tid).values())    


class res(viewsets.ModelViewSet):

   queryset = result.objects.all()
   serializer_class = resultserializers
 
class validate(APIView):
   def post(self,request):
      data=request.data["data"]
      print(data)
      ans=list(question.objects.values_list('ans', flat=True))
      mrk=0
      for i in range(len(data)):
         if(ans[i]==data[i]):
            mrk+=1
      return Response(mrk)
 
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()