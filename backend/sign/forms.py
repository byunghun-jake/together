from allauth.socialaccount.forms import SignupForm
from rest_framework import serializers

class MyCustomSocialSignupForm(SignupForm):
  tes = serializers.CharField(max_length=30)

  def save(self, request):
    user = super(MyCustomSocialSignupForm, self).save(request)
    user.tes = self.data.get('tes')
    user.save()

    return user