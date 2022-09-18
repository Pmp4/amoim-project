package com.pmp4.amoimproject.address.model;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService{
    private final AddressDAO addressDAO;

    @Override
    public int insertAddress(AddressVO addressVO) {
        return addressDAO.insertAddress(addressVO);
    }
}
