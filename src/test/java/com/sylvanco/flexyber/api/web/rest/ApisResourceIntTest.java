package com.sylvanco.flexyber.api.web.rest;

import com.sylvanco.flexyber.api.JhipsterSampleApplicationApp;

import com.sylvanco.flexyber.api.domain.Apis;
import com.sylvanco.flexyber.api.repository.ApisRepository;
import com.sylvanco.flexyber.api.service.dto.ApisDTO;
import com.sylvanco.flexyber.api.service.mapper.ApisMapper;
import com.sylvanco.flexyber.api.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.sylvanco.flexyber.api.web.rest.TestUtil.sameInstant;
import static com.sylvanco.flexyber.api.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ApisResource REST controller.
 *
 * @see ApisResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ApisResourceIntTest {

    private static final String DEFAULT_FLIGHT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_FLIGHT_TYPE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_ASSEMBLED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_ASSEMBLED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_EMERGENCY_CONTACT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMERGENCY_CONTACT_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ITINERARY = "AAAAAAAAAA";
    private static final String UPDATED_ITINERARY = "BBBBBBBBBB";

    private static final String DEFAULT_AIRCRAFT = "AAAAAAAAAA";
    private static final String UPDATED_AIRCRAFT = "BBBBBBBBBB";

    private static final String DEFAULT_CREW = "AAAAAAAAAA";
    private static final String UPDATED_CREW = "BBBBBBBBBB";

    private static final String DEFAULT_PASSENGER = "AAAAAAAAAA";
    private static final String UPDATED_PASSENGER = "BBBBBBBBBB";

    @Autowired
    private ApisRepository apisRepository;

    @Autowired
    private ApisMapper apisMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restApisMockMvc;

    private Apis apis;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ApisResource apisResource = new ApisResource(apisRepository, apisMapper);
        this.restApisMockMvc = MockMvcBuilders.standaloneSetup(apisResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Apis createEntity() {
        Apis apis = new Apis()
            .flightType(DEFAULT_FLIGHT_TYPE)
            .dateAssembled(DEFAULT_DATE_ASSEMBLED)
            .emergencyContactEmail(DEFAULT_EMERGENCY_CONTACT_EMAIL)
            .itinerary(DEFAULT_ITINERARY)
            .aircraft(DEFAULT_AIRCRAFT)
            .crew(DEFAULT_CREW)
            .passenger(DEFAULT_PASSENGER);
        return apis;
    }

    @Before
    public void initTest() {
        apisRepository.deleteAll();
        apis = createEntity();
    }

    @Test
    public void createApis() throws Exception {
        int databaseSizeBeforeCreate = apisRepository.findAll().size();

        // Create the Apis
        ApisDTO apisDTO = apisMapper.toDto(apis);
        restApisMockMvc.perform(post("/api/apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apisDTO)))
            .andExpect(status().isCreated());

        // Validate the Apis in the database
        List<Apis> apisList = apisRepository.findAll();
        assertThat(apisList).hasSize(databaseSizeBeforeCreate + 1);
        Apis testApis = apisList.get(apisList.size() - 1);
        assertThat(testApis.getFlightType()).isEqualTo(DEFAULT_FLIGHT_TYPE);
        assertThat(testApis.getDateAssembled()).isEqualTo(DEFAULT_DATE_ASSEMBLED);
        assertThat(testApis.getEmergencyContactEmail()).isEqualTo(DEFAULT_EMERGENCY_CONTACT_EMAIL);
        assertThat(testApis.getItinerary()).isEqualTo(DEFAULT_ITINERARY);
        assertThat(testApis.getAircraft()).isEqualTo(DEFAULT_AIRCRAFT);
        assertThat(testApis.getCrew()).isEqualTo(DEFAULT_CREW);
        assertThat(testApis.getPassenger()).isEqualTo(DEFAULT_PASSENGER);
    }

    @Test
    public void createApisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = apisRepository.findAll().size();

        // Create the Apis with an existing ID
        apis.setId("existing_id");
        ApisDTO apisDTO = apisMapper.toDto(apis);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApisMockMvc.perform(post("/api/apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Apis in the database
        List<Apis> apisList = apisRepository.findAll();
        assertThat(apisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllApis() throws Exception {
        // Initialize the database
        apisRepository.save(apis);

        // Get all the apisList
        restApisMockMvc.perform(get("/api/apis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(apis.getId())))
            .andExpect(jsonPath("$.[*].flightType").value(hasItem(DEFAULT_FLIGHT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].dateAssembled").value(hasItem(sameInstant(DEFAULT_DATE_ASSEMBLED))))
            .andExpect(jsonPath("$.[*].emergencyContactEmail").value(hasItem(DEFAULT_EMERGENCY_CONTACT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].itinerary").value(hasItem(DEFAULT_ITINERARY.toString())))
            .andExpect(jsonPath("$.[*].aircraft").value(hasItem(DEFAULT_AIRCRAFT.toString())))
            .andExpect(jsonPath("$.[*].crew").value(hasItem(DEFAULT_CREW.toString())))
            .andExpect(jsonPath("$.[*].passenger").value(hasItem(DEFAULT_PASSENGER.toString())));
    }

    @Test
    public void getApis() throws Exception {
        // Initialize the database
        apisRepository.save(apis);

        // Get the apis
        restApisMockMvc.perform(get("/api/apis/{id}", apis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(apis.getId()))
            .andExpect(jsonPath("$.flightType").value(DEFAULT_FLIGHT_TYPE.toString()))
            .andExpect(jsonPath("$.dateAssembled").value(sameInstant(DEFAULT_DATE_ASSEMBLED)))
            .andExpect(jsonPath("$.emergencyContactEmail").value(DEFAULT_EMERGENCY_CONTACT_EMAIL.toString()))
            .andExpect(jsonPath("$.itinerary").value(DEFAULT_ITINERARY.toString()))
            .andExpect(jsonPath("$.aircraft").value(DEFAULT_AIRCRAFT.toString()))
            .andExpect(jsonPath("$.crew").value(DEFAULT_CREW.toString()))
            .andExpect(jsonPath("$.passenger").value(DEFAULT_PASSENGER.toString()));
    }

    @Test
    public void getNonExistingApis() throws Exception {
        // Get the apis
        restApisMockMvc.perform(get("/api/apis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateApis() throws Exception {
        // Initialize the database
        apisRepository.save(apis);
        int databaseSizeBeforeUpdate = apisRepository.findAll().size();

        // Update the apis
        Apis updatedApis = apisRepository.findOne(apis.getId());
        updatedApis
            .flightType(UPDATED_FLIGHT_TYPE)
            .dateAssembled(UPDATED_DATE_ASSEMBLED)
            .emergencyContactEmail(UPDATED_EMERGENCY_CONTACT_EMAIL)
            .itinerary(UPDATED_ITINERARY)
            .aircraft(UPDATED_AIRCRAFT)
            .crew(UPDATED_CREW)
            .passenger(UPDATED_PASSENGER);
        ApisDTO apisDTO = apisMapper.toDto(updatedApis);

        restApisMockMvc.perform(put("/api/apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apisDTO)))
            .andExpect(status().isOk());

        // Validate the Apis in the database
        List<Apis> apisList = apisRepository.findAll();
        assertThat(apisList).hasSize(databaseSizeBeforeUpdate);
        Apis testApis = apisList.get(apisList.size() - 1);
        assertThat(testApis.getFlightType()).isEqualTo(UPDATED_FLIGHT_TYPE);
        assertThat(testApis.getDateAssembled()).isEqualTo(UPDATED_DATE_ASSEMBLED);
        assertThat(testApis.getEmergencyContactEmail()).isEqualTo(UPDATED_EMERGENCY_CONTACT_EMAIL);
        assertThat(testApis.getItinerary()).isEqualTo(UPDATED_ITINERARY);
        assertThat(testApis.getAircraft()).isEqualTo(UPDATED_AIRCRAFT);
        assertThat(testApis.getCrew()).isEqualTo(UPDATED_CREW);
        assertThat(testApis.getPassenger()).isEqualTo(UPDATED_PASSENGER);
    }

    @Test
    public void updateNonExistingApis() throws Exception {
        int databaseSizeBeforeUpdate = apisRepository.findAll().size();

        // Create the Apis
        ApisDTO apisDTO = apisMapper.toDto(apis);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restApisMockMvc.perform(put("/api/apis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(apisDTO)))
            .andExpect(status().isCreated());

        // Validate the Apis in the database
        List<Apis> apisList = apisRepository.findAll();
        assertThat(apisList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteApis() throws Exception {
        // Initialize the database
        apisRepository.save(apis);
        int databaseSizeBeforeDelete = apisRepository.findAll().size();

        // Get the apis
        restApisMockMvc.perform(delete("/api/apis/{id}", apis.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Apis> apisList = apisRepository.findAll();
        assertThat(apisList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Apis.class);
        Apis apis1 = new Apis();
        apis1.setId("id1");
        Apis apis2 = new Apis();
        apis2.setId(apis1.getId());
        assertThat(apis1).isEqualTo(apis2);
        apis2.setId("id2");
        assertThat(apis1).isNotEqualTo(apis2);
        apis1.setId(null);
        assertThat(apis1).isNotEqualTo(apis2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApisDTO.class);
        ApisDTO apisDTO1 = new ApisDTO();
        apisDTO1.setId("id1");
        ApisDTO apisDTO2 = new ApisDTO();
        assertThat(apisDTO1).isNotEqualTo(apisDTO2);
        apisDTO2.setId(apisDTO1.getId());
        assertThat(apisDTO1).isEqualTo(apisDTO2);
        apisDTO2.setId("id2");
        assertThat(apisDTO1).isNotEqualTo(apisDTO2);
        apisDTO1.setId(null);
        assertThat(apisDTO1).isNotEqualTo(apisDTO2);
    }
}
