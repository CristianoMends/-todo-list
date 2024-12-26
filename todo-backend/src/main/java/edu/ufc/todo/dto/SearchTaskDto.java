package edu.ufc.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchTaskDto {

    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDate startDueDate;
    private LocalDate endDueDate;
    private LocalDate startCreatedAt;
    private LocalDate endCreatedAt;
    private LocalDate startFinishedDate;
    private LocalDate endFinishedDate;

}
