from django.shortcuts import render


def serveAngular(request):
    return render(request, 'index.html')


def serveAngularUnknown(request, unknownParam):
    print(unknownParam)
    return render(request, 'index.html')
