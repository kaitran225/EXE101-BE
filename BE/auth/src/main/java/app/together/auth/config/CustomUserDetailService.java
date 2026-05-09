package app.together.auth.config;

import app.together.common.auth.entity.User;
import app.together.common.auth.enums.SystemRole;
import app.together.common.shared.exception.ResourceNotFoundException;
import app.together.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws ResourceNotFoundException {

        User user = userService.getUserByEmail(username);

        SystemRole systemRole = user.getSystemRole() != null ? user.getSystemRole() : SystemRole.USER;

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(SystemRole.USER.springAuthority()));
        if (systemRole == SystemRole.ADMIN) {
            authorities.add(new SimpleGrantedAuthority(SystemRole.ADMIN.springAuthority()));
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUserSso())
                .password(user.getPasswordHash())
                .authorities(authorities)
                .build();
    }
}

