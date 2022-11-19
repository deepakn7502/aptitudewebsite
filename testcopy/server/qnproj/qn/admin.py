from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Register your models here.

admin.site.register(stud)
admin.site.register(question)


class customadmin(UserAdmin):
    model= customuser
    fieldsets= UserAdmin.fieldsets + ((None,{'fields':('dept',)}),)

admin.site.register(customuser,customadmin)


