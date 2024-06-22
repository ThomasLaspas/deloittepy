from django.urls import path
from .views import Taxesview,GenerateAdviceView

urlpatterns = [
    path("taxes", Taxesview.as_view()),
    path("aiadvice",GenerateAdviceView.as_view())
 
]