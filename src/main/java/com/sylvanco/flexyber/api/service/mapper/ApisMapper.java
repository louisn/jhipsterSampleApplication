package com.sylvanco.flexyber.api.service.mapper;

import com.sylvanco.flexyber.api.domain.*;
import com.sylvanco.flexyber.api.service.dto.ApisDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Apis and its DTO ApisDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ApisMapper extends EntityMapper<ApisDTO, Apis> {


}
