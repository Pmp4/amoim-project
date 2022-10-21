package com.pmp4.amoimproject.common;

public class PaginationInfo {
    private int start = 1;
    private int length = 8;
    private int page;

    public PaginationInfo() {
        super();
    }

    public PaginationInfo(int length, int page) {
        super();

        this.length = length;
        this.page = page;

        startNum();
    }


    private void startNum () {
        start = length * (page-1);
    }


    public int getStart() {
        startNum();
        return start;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }


    @Override
    public String toString() {
        return "PaginationInfo{" +
                "start=" + start +
                ", length=" + length +
                ", page=" + page +
                '}';
    }
}
