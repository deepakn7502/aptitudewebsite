from django.db import models 
from django.contrib.auth.models import AbstractUser

# Create your models here.

class stud(models.Model):
    username=models.TextField(null=True)
    rollno=models.CharField(max_length=20,null=True)
    name=models.CharField(max_length=100,null=True)
    year=models.CharField(max_length=100,null=True,default="III")
    sec=models.CharField(max_length=100,null=True)
    dept=models.CharField(max_length=100,null=True)
    password = models.TextField(null=True,blank=True)
    is_active=models.IntegerField(default=0)


def upload_path(instance,filename):
        return '/'.join([str(instance.testid),filename])



class question(models.Model):
    testid= models.CharField(max_length=20,null=True)
    qnno=models.CharField(max_length=10,null=True)
    qn=models.ImageField(blank=True,null=True,upload_to=upload_path)
    ans=models.CharField(max_length=2,null=True)
    


class result(models.Model):
     username = models.TextField(null=True,blank=True)
     sec1=models.IntegerField(null=True)
     sec2=models.IntegerField(null=True)
     sec3=models.IntegerField(null=True)
     marks=models.IntegerField(null=True)
     login=models.CharField(max_length=50,null=True)
     logout=models.CharField(max_length=50,null=True)



class customuser(AbstractUser):
    dept=models.CharField(max_length=10,null=True)
    
    
