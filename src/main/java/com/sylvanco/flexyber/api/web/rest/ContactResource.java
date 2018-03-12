package com.sylvanco.flexyber.api.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sylvanco.flexyber.api.domain.Contact;

import com.sylvanco.flexyber.api.repository.ContactRepository;
import com.sylvanco.flexyber.api.web.rest.errors.BadRequestAlertException;
import com.sylvanco.flexyber.api.web.rest.util.HeaderUtil;
import com.sylvanco.flexyber.api.service.dto.ContactDTO;
import com.sylvanco.flexyber.api.service.mapper.ContactMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Contact.
 */
@RestController
@RequestMapping("/api")
public class ContactResource {

    private final Logger log = LoggerFactory.getLogger(ContactResource.class);

    private static final String ENTITY_NAME = "contact";

    private final ContactRepository contactRepository;

    private final ContactMapper contactMapper;

    public ContactResource(ContactRepository contactRepository, ContactMapper contactMapper) {
        this.contactRepository = contactRepository;
        this.contactMapper = contactMapper;
    }

    /**
     * POST  /contacts : Create a new contact.
     *
     * @param contactDTO the contactDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactDTO, or with status 400 (Bad Request) if the contact has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contacts")
    @Timed
    public ResponseEntity<ContactDTO> createContact(@RequestBody ContactDTO contactDTO) throws URISyntaxException {
        log.debug("REST request to save Contact : {}", contactDTO);
        if (contactDTO.getId() != null) {
            throw new BadRequestAlertException("A new contact cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contact contact = contactMapper.toEntity(contactDTO);
        contact = contactRepository.save(contact);
        ContactDTO result = contactMapper.toDto(contact);
        return ResponseEntity.created(new URI("/api/contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contacts : Updates an existing contact.
     *
     * @param contactDTO the contactDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactDTO,
     * or with status 400 (Bad Request) if the contactDTO is not valid,
     * or with status 500 (Internal Server Error) if the contactDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contacts")
    @Timed
    public ResponseEntity<ContactDTO> updateContact(@RequestBody ContactDTO contactDTO) throws URISyntaxException {
        log.debug("REST request to update Contact : {}", contactDTO);
        if (contactDTO.getId() == null) {
            return createContact(contactDTO);
        }
        Contact contact = contactMapper.toEntity(contactDTO);
        contact = contactRepository.save(contact);
        ContactDTO result = contactMapper.toDto(contact);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contacts : get all the contacts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contacts in body
     */
    @GetMapping("/contacts")
    @Timed
    public List<ContactDTO> getAllContacts() {
        log.debug("REST request to get all Contacts");
        List<Contact> contacts = contactRepository.findAll();
        return contactMapper.toDto(contacts);
        }

    /**
     * GET  /contacts/:id : get the "id" contact.
     *
     * @param id the id of the contactDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactDTO, or with status 404 (Not Found)
     */
    @GetMapping("/contacts/{id}")
    @Timed
    public ResponseEntity<ContactDTO> getContact(@PathVariable String id) {
        log.debug("REST request to get Contact : {}", id);
        Contact contact = contactRepository.findOne(id);
        ContactDTO contactDTO = contactMapper.toDto(contact);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contactDTO));
    }

    /**
     * DELETE  /contacts/:id : delete the "id" contact.
     *
     * @param id the id of the contactDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contacts/{id}")
    @Timed
    public ResponseEntity<Void> deleteContact(@PathVariable String id) {
        log.debug("REST request to delete Contact : {}", id);
        contactRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
