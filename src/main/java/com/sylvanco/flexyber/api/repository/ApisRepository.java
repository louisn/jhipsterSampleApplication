package com.sylvanco.flexyber.api.repository;

import com.sylvanco.flexyber.api.domain.Apis;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Apis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApisRepository extends MongoRepository<Apis, String> {

}
