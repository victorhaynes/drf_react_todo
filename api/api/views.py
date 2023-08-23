from django.http import JsonResponse
from .models import Task
from .serializers import TaskSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# /tasks/
@api_view(['GET', 'POST'])
def task_list(request):

    if request.method == 'GET':
        tasks = Task.objects.all()
        print(tasks)
        serialized_tasks = TaskSerializer(tasks, many=True)
        return Response(serialized_tasks.data)

    elif request.method == 'POST':
        serialized_task = TaskSerializer(data = request.data)
        if serialized_task.is_valid():
            serialized_task.save()
            return Response(serialized_task.data, status=status.HTTP_201_CREATED)


# /tasks/<int:id>
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def task_detail(request, id):

    try:
        task = Task.objects.get(pk=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serialized_task = TaskSerializer(task)
        return Response(serialized_task.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        pass
    elif request.method == 'PATCH':
        pass
    elif request.method == 'DELETE':
        pass