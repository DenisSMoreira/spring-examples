package com.lab.arq.dsm.dto;

import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message implements Serializable {

    private String title;
    private String description;
    private Boolean active;
    private Date created;
    private Date updated;


}