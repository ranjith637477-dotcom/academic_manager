package com.sams.dto.response;
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String name, email, role;

    public JwtResponse() {}
    public JwtResponse(String token, Long id, String name, String email, String role) {
        this.token = token; this.id = id; this.name = name; this.email = email; this.role = role;
    }
    public String getToken() { return token; } public void setToken(String t) { this.token = t; }
    public String getType() { return type; }
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getName() { return name; } public void setName(String n) { this.name = n; }
    public String getEmail() { return email; } public void setEmail(String e) { this.email = e; }
    public String getRole() { return role; } public void setRole(String r) { this.role = r; }
}
