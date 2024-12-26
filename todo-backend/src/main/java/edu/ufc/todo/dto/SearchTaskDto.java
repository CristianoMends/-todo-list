package edu.ufc.todo.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SearchTaskDto {

    private Long id;
    private String title;
    private String description;
    private Boolean completed;
    private LocalDate startDueDate;
    private LocalDate endDueDate;
    private LocalDate startCreatedAt;
    private LocalDate endCreatedAt;
    private LocalDate startFinishedDate;
    private LocalDate endFinishedDate;

}
