package com.sams.dto.request;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public class RegisterRequest {
    @NotBlank private String name;
    @Email @NotBlank private String email;
    @NotBlank private String password;
    private String phone;
    @NotBlank private String roleName;
    public String getName() { return name; } public void setName(String n) { this.name = n; }
    public String getEmail() { return email; } public void setEmail(String e) { this.email = e; }
    public String getPassword() { return password; } public void setPassword(String p) { this.password = p; }
    public String getPhone() { return phone; } public void setPhone(String p) { this.phone = p; }
    public String getRoleName() { return roleName; } public void setRoleName(String r) { this.roleName = r; }
}
