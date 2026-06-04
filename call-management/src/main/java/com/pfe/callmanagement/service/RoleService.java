package com.pfe.callmanagement.service;

import com.pfe.callmanagement.entity.Role;
import com.pfe.callmanagement.exception.DuplicateResourceException;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for role management operations.
 */
@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    /**
     * Create a new role
     */
    public Role createRole(Role role) {
        if (roleRepository.findByName(role.getName()).isPresent()) {
            throw new DuplicateResourceException("Role", "name", role.getName());
        }
        return roleRepository.save(role);
    }

    /**
     * Get role by ID
     */
    public Role getRoleById(Long roleId) {
        return roleRepository.findById(roleId)
            .orElseThrow(() -> new ResourceNotFoundException("Role", "id", roleId));
    }

    /**
     * Get role by name
     */
    public Role getRoleByName(String name) {
        return roleRepository.findByName(name)
            .orElseThrow(() -> new ResourceNotFoundException("Role", "name", name));
    }

    /**
     * Get all roles
     */
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    /**
     * Update role
     */
    public Role updateRole(Long roleId, Role roleDetails) {
        Role role = getRoleById(roleId);
        
        if (!role.getName().equals(roleDetails.getName()) && 
            roleRepository.findByName(roleDetails.getName()).isPresent()) {
            throw new DuplicateResourceException("Role", "name", roleDetails.getName());
        }

        role.setName(roleDetails.getName());
        role.setDescription(roleDetails.getDescription());
        
        return roleRepository.save(role);
    }

    /**
     * Delete role
     */
    public void deleteRole(Long roleId) {
        if (!roleRepository.existsById(roleId)) {
            throw new ResourceNotFoundException("Role", "id", roleId);
        }
        roleRepository.deleteById(roleId);
    }
}
