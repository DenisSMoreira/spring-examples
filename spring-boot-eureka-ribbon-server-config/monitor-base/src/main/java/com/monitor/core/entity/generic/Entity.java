package com.monitor.core.entity.generic;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

/**
 * Entity gerenic para contrato com as entidades, garatindo que os documentos
 * terão id e serão serializable
 *
 * @author Denis soares moreira
 *
 */
public class Entity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Indexed
    private String id;

    /**
     * Obtém o valor da propriedade id
     *
     * @return id {@link String }
     */
    public String getId() {
        return id;
    }

    /**
     * Define o valor da propriedade id
     *
     * @param id {@link String }
     */
    public void setId(String id) {
        this.id = id;
    }
}
