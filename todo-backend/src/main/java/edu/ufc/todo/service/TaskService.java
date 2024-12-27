package edu.ufc.todo.service;

import edu.ufc.todo.dto.CreateTaskDto;
import edu.ufc.todo.dto.SearchTaskDto;
import edu.ufc.todo.dto.ViewTaskDto;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;


public interface TaskService {


    void createTask(CreateTaskDto task);

    List<ViewTaskDto> getTasks(SearchTaskDto dto);

    void deleteTask(Long id);

    void updateTask(Long id, String title, String description, Boolean completed, LocalDate dueDate );

}
