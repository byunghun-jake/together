from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from .models import (
  PointTransaction, 
  Point,
)
from rest_framework.views import APIView
from django.views.generic.base import View
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator

# @method_decorator(csrf_exempt, name='dispatch')
class PointCheckoutAjaxView(APIView):

  def post(self, request, *args, **kwargs):
    if not request.user.is_authenticated:
      return JsonResponse({}, status=401)

    user = request.user
    print(user)
    amount = request.POST.get('amount')
    print(amount)
    type = request.POST.get('type')
    print(type)
    try:
      trans = PointTransaction.objects.create_new(
        user=user,
        amount=amount,
        type=type
      )
    except:
      trans = None
    print(trans)
    if trans is not None:
      data = {
        "works": True,
        "merchant_id": trans
      }
      return JsonResponse(data)
    else:
      return JsonResponse({}, status=401)

# @method_decorator(csrf_exempt, name='dispatch')
class PointImpAjaxView(APIView):
  def post(self, request, *args, **kwargs):
    if not request.user.is_authenticated:
      return JsonResponse({}, status=401)

    user = request.user
    merchant_id = request.POST.get('merchant_id')
    imp_id = request.POST.get('imp_id')
    amount = request.POST.get('amount')

    try:
      trans = PointTransaction.objects.get(
        user=user,
        order_id=merchant_id,
        amount=amount
      )
    except:
      trans = None

    if trans is not None:
      trans.transaction_id = imp_id
      trans.success = True
      trans.save()

      data = {
        "works": True
      }

      return JsonResponse(data)
    else:
      return JsonResponse({}, status=401)

def charge_point(request):
  template = 'charge.html'

  return render(request, template)