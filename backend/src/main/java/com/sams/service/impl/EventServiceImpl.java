package com.sams.service.impl;

import com.sams.dto.request.EventRequest;
import com.sams.entity.Event;
import com.sams.entity.User;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EventRepository;
import com.sams.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventServiceImpl {
    private final EventRepository eventRepo;
    private final UserRepository userRepo;

    public EventServiceImpl(EventRepository eventRepo, UserRepository userRepo) {
        this.eventRepo = eventRepo; this.userRepo = userRepo;
    }

    public Event create(Long creatorId, EventRequest req) {
        User creator = userRepo.findById(creatorId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return eventRepo.save(Event.builder().creator(creator).title(req.getTitle())
                .description(req.getDescription()).category(req.getCategory()).teamSize(req.getTeamSize())
                .requiredSkills(req.getRequiredSkills()).eventDate(req.getEventDate())
                .registrationDeadline(req.getRegistrationDeadline()).build());
    }

    public List<Event> getOpenEvents() { return eventRepo.findByIsOpenTrueOrderByCreatedAtDesc(); }
    public List<Event> getMyEvents(Long userId) { return eventRepo.findByCreatorIdOrderByCreatedAtDesc(userId); }
}
