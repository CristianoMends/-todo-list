package edu.ufc.todo.controller;

import edu.ufc.todo.dto.CreateTaskDto;
import edu.ufc.todo.dto.SearchTaskDto;
import edu.ufc.todo.dto.ViewTaskDto;
import edu.ufc.todo.service.TaskService;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    @CrossOrigin
    public ResponseEntity<Void> createTask(
            @RequestBody CreateTaskDto dto
    ) {

        this.taskService.createTask(dto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<ViewTaskDto>> getTasks(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) LocalDate startDueDate,
            @RequestParam(required = false) LocalDate endDueDate,
            @RequestParam(required = false) LocalDate startCreatedAt,
            @RequestParam(required = false) LocalDate endCreatedAt,
            @RequestParam(required = false) LocalDate startFinishedDate,
            @RequestParam(required = false) LocalDate endFinishedDate

    ) {
        var search = new SearchTaskDto(
                id,
                title,
                description,
                completed,
                startDueDate,
                endDueDate,
                startCreatedAt,
                endCreatedAt,
                startFinishedDate,
                endFinishedDate
        );
        return ResponseEntity.ok(this.taskService.getTasks(search));
    }

    @DeleteMapping("{id}")
    @CrossOrigin
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        this.taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    @CrossOrigin
    public ResponseEntity<Void> updateTask(
            @PathVariable Long id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) LocalDate dueDate
    )

    {
        this.taskService.updateTask(id, title,description, completed, dueDate);
        return ResponseEntity.noContent().build();
    }

}
