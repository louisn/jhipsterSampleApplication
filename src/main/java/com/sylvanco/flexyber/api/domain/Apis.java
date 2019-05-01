package com.sylvanco.flexyber.api.domain;

import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * The main flight filing document.
 */
@ApiModel(description = "The main flight filing document.")
@Document(collection = "apis")
public class Apis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("flight_type")
    private String flightType;

    @Field("date_assembled")
    private ZonedDateTime dateAssembled;

    @Field("emergency_contact_email")
    private String emergencyContactEmail;

    @Field("itinerary")
    private String itinerary;

    @Field("aircraft")
    private String aircraft;

    @Field("crew")
    private String crew;

    @Field("passenger")
    private String passenger;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFlightType() {
        return flightType;
    }

    public Apis flightType(String flightType) {
        this.flightType = flightType;
        return this;
    }

    public void setFlightType(String flightType) {
        this.flightType = flightType;
    }

    public ZonedDateTime getDateAssembled() {
        return dateAssembled;
    }

    public Apis dateAssembled(ZonedDateTime dateAssembled) {
        this.dateAssembled = dateAssembled;
        return this;
    }

    public void setDateAssembled(ZonedDateTime dateAssembled) {
        this.dateAssembled = dateAssembled;
    }

    public String getEmergencyContactEmail() {
        return emergencyContactEmail;
    }

    public Apis emergencyContactEmail(String emergencyContactEmail) {
        this.emergencyContactEmail = emergencyContactEmail;
        return this;
    }

    public void setEmergencyContactEmail(String emergencyContactEmail) {
        this.emergencyContactEmail = emergencyContactEmail;
    }

    public String getItinerary() {
        return itinerary;
    }

    public Apis itinerary(String itinerary) {
        this.itinerary = itinerary;
        return this;
    }

    public void setItinerary(String itinerary) {
        this.itinerary = itinerary;
    }

    public String getAircraft() {
        return aircraft;
    }

    public Apis aircraft(String aircraft) {
        this.aircraft = aircraft;
        return this;
    }

    public void setAircraft(String aircraft) {
        this.aircraft = aircraft;
    }

    public String getCrew() {
        return crew;
    }

    public Apis crew(String crew) {
        this.crew = crew;
        return this;
    }

    public void setCrew(String crew) {
        this.crew = crew;
    }

    public String getPassenger() {
        return passenger;
    }

    public Apis passenger(String passenger) {
        this.passenger = passenger;
        return this;
    }

    public void setPassenger(String passenger) {
        this.passenger = passenger;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Apis apis = (Apis) o;
        if (apis.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), apis.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Apis{" +
            "id=" + getId() +
            ", flightType='" + getFlightType() + "'" +
            ", dateAssembled='" + getDateAssembled() + "'" +
            ", emergencyContactEmail='" + getEmergencyContactEmail() + "'" +
            ", itinerary='" + getItinerary() + "'" +
            ", aircraft='" + getAircraft() + "'" +
            ", crew='" + getCrew() + "'" +
            ", passenger='" + getPassenger() + "'" +
            "}";
    }
}
