package com.sams.service.impl;

import com.sams.entity.Notification;
import com.sams.entity.User;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.NotificationRepository;
import com.sams.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationServiceImpl {
    private final NotificationRepository notifRepo;
    private final UserRepository userRepo;

    public NotificationServiceImpl(NotificationRepository notifRepo, UserRepository userRepo) {
        this.notifRepo = notifRepo; this.userRepo = userRepo;
    }

    public Notification send(Long userId, String title, String message, String type) {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return notifRepo.save(Notification.builder().user(user).title(title).message(message).type(type).build());
    }

    public List<Notification> getMyNotifications(Long userId) { return notifRepo.findByUserIdOrderByCreatedAtDesc(userId); }

    public void markRead(Long id) {
        notifRepo.findById(id).ifPresent(n -> { n.setIsRead(true); notifRepo.save(n); });
    }

    public long getUnreadCount(Long userId) { return notifRepo.countByUserIdAndIsReadFalse(userId); }
}
