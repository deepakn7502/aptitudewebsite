from rest_framework import serializers

from django.contrib.auth.models import User
from qn.models import *

class registerserializers(serializers.ModelSerializer):
    class Meta:
        model=stud
        fields='__all__'



class loginserializers(serializers.ModelSerializer):
    class Meta:
        model=stud
        fields='__all__'
        #fields=['username','password']

class resultserializers(serializers.ModelSerializer):
    class Meta:
        model=result
        fields='__all__'


class questionserializers(serializers.ModelSerializer):
    class Meta:
        model=question
        fields='__all__'