package com.lab.arq.dsm.core.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;

//@Document

@Data
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement
public class Message implements Serializable {

//    @Id
//    @Indexed
    private String id;
    private String title;
    private String description;
    private Boolean active;
    private Date created;
    private Date updated;

}