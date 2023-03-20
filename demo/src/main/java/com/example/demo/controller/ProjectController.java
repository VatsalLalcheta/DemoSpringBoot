package com.example.demo.controller;

import com.example.demo.model.Project;
import com.example.demo.rep.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addProject(@RequestBody Project project) {
        return ResponseEntity.ok(this.projectRepository.save(project));
    }

    @PostMapping("/delete")
    public void deleteProject(@RequestBody Project project) {
        this.projectRepository.delete(project);
    }


    @GetMapping("/")
    public ResponseEntity<?> getProject() {
        return ResponseEntity.ok(this.projectRepository.findAll());
    }

}
