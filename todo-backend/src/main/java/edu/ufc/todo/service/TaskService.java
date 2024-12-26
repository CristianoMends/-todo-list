package edu.ufc.todo.service;

import edu.ufc.todo.dto.CreateTaskDto;
import edu.ufc.todo.dto.SearchTaskDto;
import edu.ufc.todo.dto.ViewTaskDto;

import java.util.List;


public interface TaskService {


    void createTask(CreateTaskDto task);

    List<ViewTaskDto> getTasks(SearchTaskDto dto);

}
