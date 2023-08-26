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
        serialized_task = TaskSerializer(task, data=request.data)
        if serialized_task.is_valid():
            serialized_task.save()
            return Response(serialized_task.data, status.HTTP_202_ACCEPTED)
        return Response(serialized_task.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'PATCH':
        serialized_task = TaskSerializer(task, data=request.data, partial=True)
        if serialized_task.is_valid():
            serialized_task.save()
            return Response(serialized_task.data,status.HTTP_202_ACCEPTED)
        return Response(serialized_task.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        deleted_task = TaskSerializer(task)
        task.delete()
        return Response(deleted_task.data, status=status.HTTP_202_ACCEPTED)