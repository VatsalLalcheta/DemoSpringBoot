package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Project")
public class Project {
    private String projectName;
    @Id
    private String projectID;
    private List<Task> projectTasks;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Task {
        @Id
        private String taskID;
        private String taskName;
        private String taskDescription;

    }

}