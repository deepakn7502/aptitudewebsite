from django.contrib import admin
from . import views
from .views import *
from django.urls import path,include,re_path
from django.views.generic import TemplateView

img_up = qn.as_view({
    'get': 'list',
    'post': 'post'
})

reg = register.as_view({
    'post': 'create'
})


urlpatterns = [
    path(r"reg/",reg,name='reg'),
    path(r"stafflg/",stafflogin.as_view()),
    path(r"log/",login.as_view()),
    re_path(r'^qn/(?P<tid>.+)/$',views.qndisp.as_view(),name='displayimg'),
    path(r"qn/",img_up,name='img_up'),
    path(r"rst/<str:tid>/",resdisp.as_view()),
    path(r"validate/",validate.as_view()),

]


#url(r'^users/(?P<user_id>\d+)/$', 'viewname', name='urlname')
