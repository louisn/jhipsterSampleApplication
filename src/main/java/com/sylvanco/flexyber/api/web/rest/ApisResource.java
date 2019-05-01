package com.sylvanco.flexyber.api.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.sylvanco.flexyber.api.domain.Apis;

import com.sylvanco.flexyber.api.repository.ApisRepository;
import com.sylvanco.flexyber.api.web.rest.errors.BadRequestAlertException;
import com.sylvanco.flexyber.api.web.rest.util.HeaderUtil;
import com.sylvanco.flexyber.api.service.dto.ApisDTO;
import com.sylvanco.flexyber.api.service.mapper.ApisMapper;
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
 * REST controller for managing Apis.
 */
@RestController
@RequestMapping("/api")
public class ApisResource {

    private final Logger log = LoggerFactory.getLogger(ApisResource.class);

    private static final String ENTITY_NAME = "apis";

    private final ApisRepository apisRepository;

    private final ApisMapper apisMapper;

    public ApisResource(ApisRepository apisRepository, ApisMapper apisMapper) {
        this.apisRepository = apisRepository;
        this.apisMapper = apisMapper;
    }

    /**
     * POST  /apis : Create a new apis.
     *
     * @param apisDTO the apisDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new apisDTO, or with status 400 (Bad Request) if the apis has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/apis")
    @Timed
    public ResponseEntity<ApisDTO> createApis(@RequestBody ApisDTO apisDTO) throws URISyntaxException {
        log.debug("REST request to save Apis : {}", apisDTO);
        if (apisDTO.getId() != null) {
            throw new BadRequestAlertException("A new apis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Apis apis = apisMapper.toEntity(apisDTO);
        apis = apisRepository.save(apis);
        ApisDTO result = apisMapper.toDto(apis);
        return ResponseEntity.created(new URI("/api/apis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /apis : Updates an existing apis.
     *
     * @param apisDTO the apisDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated apisDTO,
     * or with status 400 (Bad Request) if the apisDTO is not valid,
     * or with status 500 (Internal Server Error) if the apisDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/apis")
    @Timed
    public ResponseEntity<ApisDTO> updateApis(@RequestBody ApisDTO apisDTO) throws URISyntaxException {
        log.debug("REST request to update Apis : {}", apisDTO);
        if (apisDTO.getId() == null) {
            return createApis(apisDTO);
        }
        Apis apis = apisMapper.toEntity(apisDTO);
        apis = apisRepository.save(apis);
        ApisDTO result = apisMapper.toDto(apis);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, apisDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /apis : get all the apis.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of apis in body
     */
    @GetMapping("/apis")
    @Timed
    public List<ApisDTO> getAllApis() {
        log.debug("REST request to get all Apis");
        List<Apis> apis = apisRepository.findAll();
        return apisMapper.toDto(apis);
        }

    /**
     * GET  /apis/:id : get the "id" apis.
     *
     * @param id the id of the apisDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the apisDTO, or with status 404 (Not Found)
     */
    @GetMapping("/apis/{id}")
    @Timed
    public ResponseEntity<ApisDTO> getApis(@PathVariable String id) {
        log.debug("REST request to get Apis : {}", id);
        Apis apis = apisRepository.findOne(id);
        ApisDTO apisDTO = apisMapper.toDto(apis);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(apisDTO));
    }

    /**
     * DELETE  /apis/:id : delete the "id" apis.
     *
     * @param id the id of the apisDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/apis/{id}")
    @Timed
    public ResponseEntity<Void> deleteApis(@PathVariable String id) {
        log.debug("REST request to delete Apis : {}", id);
        apisRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
