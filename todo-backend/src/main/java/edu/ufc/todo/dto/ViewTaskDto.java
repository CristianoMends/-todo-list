package edu.ufc.todo.dto;

import java.time.LocalDate;

public record ViewTaskDto(
        Long id,
        String title,
        String description,
        boolean completed,
        LocalDate createdAt,
        LocalDate dueDate,
        LocalDate finishedAt
) {

}
