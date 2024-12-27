package edu.ufc.todo.entity;

import edu.ufc.todo.dto.ViewTaskDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    private Boolean completed;

    @Column(nullable = false, updatable = false)
    private LocalDate createdAt;

    private LocalDate finishedAt;

    private LocalDate dueDate;

    public Task(String title, String description, LocalDate dueDate){
        setTitle(title);
        setDescription(description);
        setDueDate(dueDate);
        setCompleted(false);
        setCreatedAt(LocalDate.now());
        setFinishedAt(null);
    }

    public ViewTaskDto toView(){
        return new ViewTaskDto(
                id,
                title,
                description,
                completed,
                createdAt,
                dueDate,
                finishedAt
        );
    }
}
