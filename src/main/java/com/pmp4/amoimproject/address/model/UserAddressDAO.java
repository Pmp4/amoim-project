package com.pmp4.amoimproject.address.model;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserAddressDAO {
    int insertAddress(UserAddressVO userAddressVO);
}
