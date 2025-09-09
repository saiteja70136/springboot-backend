package com.loginandregistration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

@org.springframework.context.annotation.Configuration
@EnableWebSecurity
public class Configuration {
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	     http.csrf().disable();
    	     http.authorizeHttpRequests(auth->auth
    	    		 .requestMatchers("/registeruserform").permitAll()
    	    		 .requestMatchers("/storedataintodb").permitAll()
    	    		 .requestMatchers("/RegistrationCss.css", "/userregistration.js","/mainpage.css","/mainpage.js","/cartpage.css","/cartpage.js","/cartpage.html","/products.js").permitAll()
    	    		 .requestMatchers("/dashbordpage").permitAll()
    	    		 .requestMatchers("/storeproductinfo").permitAll()
    	    		 .requestMatchers("/getstoredproductinfo").permitAll()
    	    	
    	    		 .anyRequest().authenticated()
    	     ).formLogin(form->form
    	    		 .loginPage("/loginpage")
    	    		 .loginProcessingUrl("/ownlogin")
    	    		 .defaultSuccessUrl("/dashbordpagelogin?success=true", true)
    	    		 .usernameParameter("email")
    	    		 .failureUrl("/loginpage?failure=true")
    	    		 .permitAll()
    	    		 )
    	       .logout(logout->logout
    	    		   .logoutUrl("/logout")
    	    		   .logoutSuccessUrl("/loginpage?logout=true")
    	    		   .permitAll())
    	       .exceptionHandling(ex -> ex
    	    		    .authenticationEntryPoint((request, response, authException) -> {
    	    		        response.setStatus(HttpServletResponse.SC_FOUND); // 302 redirect
    	    		        response.setHeader("Location", "/loginpage"); // your default page
    	    		    })
    	    		);
//    	     we told Spring Security:
//    	    	 “Whenever someone hits a protected endpoint without being logged in, don’t give 401, but redirect them to /loginpage.”
//    	    	 So now Spring treats /loginpage as your “entry point” for unauthenticated users.
//    	    	 That’s why whenever you make a request from browser URL bar or via fetch, the server ultimately forces the user to /loginpage.
//           mainly this approach is used in the reason of fetch or async functions in javascript because without this 
//           approach we didn't redirect to actual default page insted we get response status
//           and actual default page code which is not useful.
//           if we didn't use this approach then which requests are made from url bar to authorized endpoint without logged in those requests are redirect to 
//           default page(/loginpage) but which request are made from fetch or async funtion those are not redirect to default page(loginpage).    	     
    	     return http.build();
    }
}
