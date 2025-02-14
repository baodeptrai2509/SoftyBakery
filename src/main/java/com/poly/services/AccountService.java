package com.poly.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.poly.models.Account;

@Service
public interface AccountService extends UserDetailsService {
    Account getAccountAuth();
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
