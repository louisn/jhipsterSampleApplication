package com.sylvanco.flexyber.api.service.mapper;

import com.sylvanco.flexyber.api.domain.*;
import com.sylvanco.flexyber.api.service.dto.ContactDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Contact and its DTO ContactDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ContactMapper extends EntityMapper<ContactDTO, Contact> {


}
