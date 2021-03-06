package org.chums.checkin.models;

import org.chums.checkin.helpers.CachedData;

public class VisitSession {
    private Session session;

    public String getDisplayText()
    {
        ServiceTime st = CachedData.ServiceTimes.getById(getSession().getServiceTimeId());
        return st.getName() + " - " + st.getGroups().getById(getSession().getGroupId()).getName();
    }

    public String getPickupText()
    {
        ServiceTime st = CachedData.ServiceTimes.getById(getSession().getServiceTimeId());
        Group g = st.getGroups().getById(getSession().getGroupId());
        if (g.parentPickup) return g.getName();
        else return "";
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}
