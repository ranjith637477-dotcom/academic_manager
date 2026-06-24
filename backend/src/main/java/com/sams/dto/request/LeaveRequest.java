package com.sams.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
public class LeaveRequest {
    @NotBlank private String type;
    @NotNull private LocalDate fromDate;
    @NotNull private LocalDate toDate;
    @NotBlank private String reason;
    private String eventName;
    public String getType() { return type; } public void setType(String t) { this.type = t; }
    public LocalDate getFromDate() { return fromDate; } public void setFromDate(LocalDate d) { this.fromDate = d; }
    public LocalDate getToDate() { return toDate; } public void setToDate(LocalDate d) { this.toDate = d; }
    public String getReason() { return reason; } public void setReason(String r) { this.reason = r; }
    public String getEventName() { return eventName; } public void setEventName(String e) { this.eventName = e; }
}
