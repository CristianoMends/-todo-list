package edu.ufc.todo.dto;

import edu.ufc.todo.entity.Task;

import java.time.LocalDate;

public record CreateTaskDto(String title, String description, LocalDate dueDate) {

    public Task toEntity(){
        return new Task(title,description,dueDate);
    }
}
