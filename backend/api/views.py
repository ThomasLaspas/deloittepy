import os
from django.contrib.auth.models import User
from dotenv import load_dotenv
from .serializers import UserSerializer, Taxesserial
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from openai import OpenAI
from .models import Taxes
from django.conf import settings

# Load the .env file
load_dotenv()

# Get the OpenAI API key from the environment
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)

class Taxesview(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        username = request.query_params.get('username')  # Get username from query parameters

        try:
            data = Taxes.objects.get(username=username)
            serializer = Taxesserial(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Taxes.DoesNotExist:
            return Response({"detail": "No taxes found for this user."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request):
           username = request.data.get('username')
           if not username:
              return Response({'error': 'username is required'}, status=status.HTTP_400_BAD_REQUEST)

           update_taxes = get_object_or_404(Taxes, username=username)
           serializer = Taxesserial(update_taxes, data=request.data, partial=True)
           if serializer.is_valid():
             serializer.save()
             return Response('success', status=status.HTTP_200_OK)
           else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
           
            Taxes.objects.create(username=user.username)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            # Manually blacklist the token
            
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class GenerateAdviceView(APIView):

    permission_classes=[IsAuthenticated]
    def post(self, request):
        username = request.data.get('username')
        if not username:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        userTaxes = get_object_or_404(Taxes, username=username)

        user_data_content = f"""
            Employment Info: {userTaxes.employment_info or "Not provided"},
            Expenses: {userTaxes.expenses or "Not provided"},
            Add Taxes: {"Yes" if userTaxes.add_taxes else "No"},
            House Number: {userTaxes.house_number or "Not provided"},
            Location: {userTaxes.location or "Not provided"},
            Married Status: {userTaxes.married_status or "Not provided"},
            Salary: {userTaxes.salary or "Not provided"},
            My name: {userTaxes.username}
        """

        instruction_message = {
            'role': 'system',
            'content': "You are a helpful assistant from the Iron Man movie. FRIDAY. You have to act like her. Your main role is to give tax advice for Greek citizens with the data that will be received. Advice on how should I adjust my assets to optimize my taxes or do I have any withholding tax obligations? and others. Your answer should only address these questions with the best possible advice. At the end, don't say if you have another question or something else. Just say 'Best regards' or something like that."
        }

        user_message = {
            'role': 'user',
            'content': user_data_content
        }

        try:
            response = client.chat.completions.create(model="gpt-3.5-turbo",
            messages=[instruction_message, user_message])
            advice = response.choices[0].message.content
            return Response({'advice': advice}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)