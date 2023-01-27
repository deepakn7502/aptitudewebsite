from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework import generics,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import serializers
from pathlib import Path
import json
from django.db import connection
import base64


cursor=connection.cursor()

class register(viewsets.ModelViewSet):
   queryset = stud.objects.all()
   serializer_class = registerserializers
 

class login(APIView):
   def auth(self,username,password):
      try:
         user=list(stud.objects.filter(username=username,password=password,is_active=0).values('username','rollno','name','rollno','year','sec','dept'))[0]
         return user
      except:
         return None
     
   def post(self,request):
      data=request.data 
      print(data)
      serializer = loginserializers(data=data)
      if (serializer.is_valid()):
       user = self.auth(data['username'],data['password'])
       if user is not None:
        stud.objects.filter(username=user["username"]).update(is_active=1)
        return  Response(user)
       else :
          raise serializers.ValidationError({"Incorrect Credentials"})
      else :
         return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   def put(self,request):
      data=request.data
      dt = json.loads(data["user"])
      try :
        stud.objects.filter(username=dt["username"]).update(is_active=0)
        return Response("Success")
      except :
         raise  serializers.ValidationError("Incorrect Credentials")

class stafflogin(APIView):

   def get(self,request):
      return Response(customuser.objects.all().values())
     
   def post(self,request):

      data=request.data
      user = authenticate(request,username=data['username'],password=data['password'])
      
      if user is not None:
         return  Response(str(user))
      else:
         raise  serializers.ValidationError("Incorrect Credentials")
      
    

class qn(viewsets.ModelViewSet):
    queryset=question.objects.all()
    serializer_class=questionserializers

    def ip(self,image):
      dict={}
      dict["img"]=base64.b64encode(image.read()).decode()
      #dict["img"]=image
      return dict

    def post(self,request,*args,**kwargs):
      no=0
      tid=request.data["testid"]
      img=dict((request.data).lists())["qns"]    
      ans=list(request.data["ans"].split(","))
      
      
      for i in img:
        no+=1
        image=self.ip(i)
        question.objects.create(testid=tid,qnno=no,qn=image["img"],ans=ans[no-1])
      cursor.execute("CREATE TABLE {} ( username varchar(255) PRIMARY KEY,rollno varchar(20),name varchar(100),dept varchar(10),year varchar(5),sec varchar(4),aptitude int,verbal int,technical int,total int);".format(tid))
      return  Response(tid)
   
    
class check(APIView):
   def post(self,request):
      data=request.data
      print(data)
      chk=question.objects.filter(testid=data["tid"]).exists()
      tst=list(stud.objects.filter(username=data["username"]).values('test'))[0]["test"]
   
      if(chk):
         if (str(tst) != "None"):
           if data["tid"] in tst.split(","):
            raise Exception("Aldready writen")
         return Response("Success")
      else:
          raise Exception("Select valid date")


class qndisp(generics.ListAPIView):
   queryset = question.objects.all()
   serializer_class = questionserializers
   def get_queryset(self):
        print(self.kwargs['tid'])
        try:
         return question.objects.filter(testid=self.kwargs['tid'],status=1)
        except :
         return  Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class resdisp(APIView):
    def post(self,request):
      data=request.data
      cursor.execute("SELECT * FROM {tid} ".format(**data))
      res=cursor.fetchall()
      result=[]
      headers=["username","rollno","name","department","year","section","aptitude","technical","verbal","total"]
      for i in res:
         result+=[{headers[j]:i[j] for j in range(len(i))}]
      return  Response(result)

 
 
class validate(APIView):
   def post(self,request):
      data=request.data
      res1=data["ans1"]
      res2=data["ans2"]
      res3=data["ans3"]

      ans=list(question.objects.values_list('ans', flat=True))
      ans1=ans[0:15]
      ans2=ans[15:30]
      ans3=ans[30:45]

      data["m1"]=0
      data["m2"]=0
      data["m3"]=0
      
      for i in range(len(res1)):
         if(ans1[i]==res1[i]):
            data["m1"]+=1
      for i in range(len(res2)):
         if(ans2[i]==res2[i]):
           data["m2"]+=1
      for i in range(len(res3)):
         if(ans3[i]==res3[i]):
            data["m3"]+=1
      data["total"]=data["m1"]+data["m2"]+data["m3"]

      cursor.execute("INSERT INTO {tid} VALUES ({username},'{rollno}','{name}','{dept}','{year}','{sec}',{m1},{m2},{m3},{total});".format(**data))

      tst=list(stud.objects.filter(username=data["username"]).values('test'))[0]["test"]
      if(tst): 
         res= tst + "," + data["tid"]
      else:
         res=data["tid"]
      stud.objects.filter(username=data["username"]).update(test=res)
      return Response({"mark1":data["m1"],"mark2":data["m2"],"mark3":data["m3"]})
 
class search(APIView):
   def post(self,request):
      data=request.data
      str="SELECT * FROM {}".format(data["tid"])
      if(data["dept"]):
         str+=" WHERE dept='{}'".format(data["dept"])
      if(data["year"]):
         str+=" AND year='{}'".format(data["year"])
      if(data["sec"]):
         str+=" AND sec='{}'".format(data["sec"])
      str += ";"
      cursor.execute(str)
      res=cursor.fetchall()
      result=[]
      headers=["username","rollno","name","department","year","section","aptitude","technical","verbal","total"]
      for i in res:
         result+=[{headers[j]:i[j] for j in range(len(i))}]
      return Response(result)

'''
{
"tid":"PEC2601",
"dept":"CSE",
"year":"III",
"sec":"E"
}
'''