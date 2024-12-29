package edu.ufc.todo.repository;

import edu.ufc.todo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("""
        select t from Task t
        where   (:id is null or t.id = :id)
        and     (upper(t.title) like concat('%', upper(:title), '%'))
        and     (upper(t.description) like concat('%', upper(:description), '%'))
        and     (:completed is null or t.completed = :completed)
        and     (:startCreatedAt is null or :endCreatedAt is null or t.createdAt between :startCreatedAt and :endCreatedAt)
        and     (:startDueDate is null or :endDueDate is null or t.dueDate between :startDueDate and :endDueDate)
        and     (:startFinishedDate is null or :endFinishedDate is null or t.finishedAt between :startFinishedDate and :endFinishedDate)
       """)
    List<Task> findByFilters(
            @Param("id") Long id,
            @Param("title") String title,
            @Param("description") String description,
            @Param("completed") Boolean completed,
            @Param("startCreatedAt") LocalDate startCreatedAt,
            @Param("endCreatedAt") LocalDate endCreatedAt,
            @Param("startDueDate") LocalDate startDueDate,
            @Param("endDueDate") LocalDate endDueDate,
            @Param("startFinishedDate") LocalDate startFinishedDate,
            @Param("endFinishedDate") LocalDate endFinishedDate
    );





}
