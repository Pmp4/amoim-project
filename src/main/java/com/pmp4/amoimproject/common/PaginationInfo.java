package com.pmp4.amoimproject.common;

public class PaginationInfo {
    private int startRecord = 1;
    private int blockSize = 8;
    private int currentPage = 1;
    private int totalRecord;
    private int startPage;
    private int lastPage;
    private int totalPage;
    private int pageSize = 5;


    public PaginationInfo() {
        super();
    }

    public PaginationInfo(int blockSize, int currentPage) {
        super();

        this.blockSize = blockSize;
        this.currentPage = currentPage;

        startNum();
    }


    private void startNum () {
        startRecord = blockSize * (currentPage-1);
    }


    public int getStartRecord() {
        startNum();
        return startRecord;
    }

    public int getBlockSize() {
        return blockSize;
    }

    public void setBlockSize(int blockSize) {
        this.blockSize = blockSize;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }





    public int getTotalRecord() {
        return totalRecord;
    }

    public void setTotalRecord(int totalRecord) {
        this.totalRecord = totalRecord;
        totalPage = (int) Math.ceil((float)totalRecord / blockSize);

        startPage = currentPage / pageSize + 1;
    }



    public int getStartPage() {
        return startPage;
    }



    public int getTotalPage() {
        return totalPage;
    }



    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    @Override
    public String toString() {
        return "PaginationInfo{" +
                "startRecord=" + startRecord +
                ", blockSize=" + blockSize +
                ", currentPage=" + currentPage +
                ", totalRecord=" + totalRecord +
                ", startPage=" + startPage +
                ", lastPage=" + lastPage +
                ", totalPage=" + totalPage +
                '}';
    }
}
