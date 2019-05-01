package com.sylvanco.flexyber.api.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Apis entity.
 */
public class ApisDTO implements Serializable {

    private String id;

    private String flightType;

    private ZonedDateTime dateAssembled;

    private String emergencyContactEmail;

    private String itinerary;

    private String aircraft;

    private String crew;

    private String passenger;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFlightType() {
        return flightType;
    }

    public void setFlightType(String flightType) {
        this.flightType = flightType;
    }

    public ZonedDateTime getDateAssembled() {
        return dateAssembled;
    }

    public void setDateAssembled(ZonedDateTime dateAssembled) {
        this.dateAssembled = dateAssembled;
    }

    public String getEmergencyContactEmail() {
        return emergencyContactEmail;
    }

    public void setEmergencyContactEmail(String emergencyContactEmail) {
        this.emergencyContactEmail = emergencyContactEmail;
    }

    public String getItinerary() {
        return itinerary;
    }

    public void setItinerary(String itinerary) {
        this.itinerary = itinerary;
    }

    public String getAircraft() {
        return aircraft;
    }

    public void setAircraft(String aircraft) {
        this.aircraft = aircraft;
    }

    public String getCrew() {
        return crew;
    }

    public void setCrew(String crew) {
        this.crew = crew;
    }

    public String getPassenger() {
        return passenger;
    }

    public void setPassenger(String passenger) {
        this.passenger = passenger;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ApisDTO apisDTO = (ApisDTO) o;
        if(apisDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), apisDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ApisDTO{" +
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
