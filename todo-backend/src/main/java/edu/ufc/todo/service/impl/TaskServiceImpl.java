package edu.ufc.todo.service.impl;

import edu.ufc.todo.dto.CreateTaskDto;
import edu.ufc.todo.dto.SearchTaskDto;
import edu.ufc.todo.dto.ViewTaskDto;
import edu.ufc.todo.entity.Task;
import edu.ufc.todo.repository.TaskRepository;
import edu.ufc.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void createTask(CreateTaskDto task) {
        this.taskRepository.save(task.toEntity());
    }

    @Override
    public List<ViewTaskDto> getTasks(SearchTaskDto dto) {
        validateSearchTaskDto(dto);
        List<Task> tasks = taskRepository.findByFilters(
                dto.getId(),
                dto.getTitle(),
                dto.getDescription(),
                dto.isCompleted(),
                dto.getStartCreatedAt(),
                dto.getEndCreatedAt(),
                dto.getStartDueDate(),
                dto.getEndDueDate(),
                dto.getStartFinishedDate(),
                dto.getEndFinishedDate()
        );
        return tasks.stream().map(Task::toView).toList();
    }

    private void validateSearchTaskDto(SearchTaskDto dto) {

        if (dto.getStartCreatedAt() != null && dto.getEndCreatedAt() != null &&
                dto.getStartCreatedAt().isAfter(dto.getEndCreatedAt())) {
            throw new IllegalArgumentException("The start creation date cannot be after the end creation date.");
        }

        if (dto.getStartFinishedDate() != null && dto.getEndFinishedDate() != null &&
                dto.getStartFinishedDate().isAfter(dto.getEndFinishedDate())) {
            throw new IllegalArgumentException("The start finished date cannot be after the end finished date.");
        }

        if (dto.getStartDueDate() != null && dto.getEndDueDate() != null &&
                dto.getStartDueDate().isAfter(dto.getEndDueDate())) {
            throw new IllegalArgumentException("The start due date cannot be after the end due date.");
        }
        if (dto.getDescription() == null){
            dto.setDescription("");
        }
        if (dto.getTitle() == null){
            dto.setTitle("");
        }

    }
}
