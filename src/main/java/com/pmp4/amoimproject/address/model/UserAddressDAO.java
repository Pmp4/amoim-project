package com.pmp4.amoimproject.address.model;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserAddressDAO {
    int insertAddress(UserAddressVO userAddressVO);

    Map<String, Object> selectUserSido(Long userNo);
}
