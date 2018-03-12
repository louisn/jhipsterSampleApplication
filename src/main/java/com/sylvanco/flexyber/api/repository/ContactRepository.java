package com.sylvanco.flexyber.api.repository;

import com.sylvanco.flexyber.api.domain.Contact;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Contact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {

}
