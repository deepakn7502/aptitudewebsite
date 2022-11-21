from django.contrib import admin
from .views import *
from django.urls import path,include,re_path
from django.views.generic import TemplateView

img_up = qn.as_view({
    'get': 'list',
    'post': 'post'
})

reg = register.as_view({
    'get':'list',
    'post': 'create'
})


urlpatterns = [
    path(r"reg/",reg,name='reg'),
    path(r"stafflg/",stafflogin.as_view()),
    path(r"log/",login.as_view()),
    path(r"qn/<str:tid>/",qndisp.as_view()),
    path(r"qn/",img_up,name='img_up'),
     path(r"rst/",res.as_view()),
    path(r"rst/<str:tid>/",resdisp.as_view()),
    path(r"validate/",validate.as_view()),

]

#url(r'^users/(?P<user_id>\d+)/$', 'viewname', name='urlname')
