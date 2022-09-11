package com.pmp4.amoimproject.interest.model;

import lombok.Data;

@Data
public class InterestVO {
    private int interestNo;
    private String categoryCode;
    private String categoryParent;
    private String name;
    private float imageSize;
    private String originalImageName;
    private String imageName;
    private String colorCode;
}
